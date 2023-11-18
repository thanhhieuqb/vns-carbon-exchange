import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Navigation from './components/Navigation.js';
import Credit from './components/Credit.js';
import CarbonCredit from './abis/CarbonCredit.json';
import Escrow from './abis/Escrow.json';
import config from './config.json';

function App() {
  const [provider, setProvider] = useState(null)
  const [escrow, setEscrow] = useState(null)
  const [account, setAccount] = useState(null)
  const [credits, setCredits] = useState([])
  const [credit, setCredit] = useState({})
  const [toggle, setToggle] = useState(false);

  const loadBlockchainData = async () => {
try {
      await window.ethereum.enable();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      const network = await provider.getNetwork()
      const chainId = network.chainId;

      const contractAddresses = config[chainId];
      if(!contractAddresses) {
        throw new Error(`No contract deployed to chain with id ${chainId}`);
      }
  
      const carbonCredit = new ethers.Contract(config[network.chainId].carbonCredit.address, CarbonCredit, provider)
      const totalSupply = await carbonCredit.totalSupply()
      const credits = []
  
      for (var i = 1; i <= totalSupply; i++) {
        const uri = await carbonCredit.tokenURI(i)
        const response = await fetch(uri)
        const metadata = await response.json()
        credits.push(metadata)
      }
  
      setCredits(credits)
  
      const escrow = new ethers.Contract(config[network.chainId].escrow.address, Escrow, provider)
      setEscrow(escrow)
  
      window.ethereum.on('accountsChanged', async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0])
        setAccount(account);
      })
} catch (error) {
  console.error("Error loading blockchain data", error);
}
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  const togglePop = (credit) => {
    setCredit(credit)
    toggle ? setToggle(false) : setToggle(true);
  }

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />

      <div className='cards__section'>

        <h3>Available Credits</h3>

        <hr />

        <div className='cards'>
          {credits.map((credit, index) => (
            <div className='card' key={index} onClick={() => togglePop(credit)}>
              <div className='card__image'>
                <img src={credit.image} alt="Credit" />
              </div>
              <div className='card__info'>
                <h4>{credit.attributes[5].value} Credits</h4>
                <p>{credit.address}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {toggle && (
        <Credit credit={credit} provider={provider} account={account} escrow={escrow} togglePop={togglePop} />
      )}

    </div>
  );
}

export default App;
