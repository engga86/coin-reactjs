import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [amount, setAmount] = useState(0);
  const [selected, setSelect] = useState(0);

  const onSelect = (event) => {
    setSelect(event.target.value);
    // console.log(event);
  };

  const onChange = (event) => {
    setAmount(event.target.value);
  };
  const onClick = () => {
    setAmount(0);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  // const coinPrice = coins.map((i) => i.quotes.USD.price);

  return (
    <div>
      <h1>The Coins {loading ? "..." : `(${coins.length})`}</h1>
      {loading ? <strong>Loading...</strong> : null}
      <label>Enter amount of USD to spend</label> <br />
      <input
        value={amount}
        onChange={onChange}
        type="number"
        placeholder="Enter number"
      />
      <br />
      <br />
      <select onChange={onSelect}>
        <option key="-1">select coin</option>
        {coins.map((i) => (
          <option key={i.id} value={[i.quotes.USD.price]}>
            {i.name} ({i.symbol}) : ${i.quotes.USD.price.toFixed(2)} USD
          </option>
        ))}
      </select>
      <br />
      {/* {console.log(selected)} */}
      <h3>
        Currently you can buy:
        {amount === 0 ? " 0" : (amount / selected).toFixed(2)} coins
      </h3>
      <select>
        {coins.map((i) => (
          <option key={i.id}>
            {i.name} : {amount / i.quotes.USD.price} ({i.symbol})
          </option>
        ))}
      </select>
      <br />
      <br />
      <button onClick={onClick}>Reset</button>
    </div>
  );
}

export default App;
