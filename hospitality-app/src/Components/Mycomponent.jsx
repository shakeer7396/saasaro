import React, { useState, useEffect } from "react";
import styles from './Home.module.css';


const Mycomponent = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    fetch("https://victorious-tan-bikini.cyclic.app/items")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://victorious-tan-bikini.cyclic.app/form-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((response) => response.json())
      .then((data) => {
        setData((prevData) => [...prevData, data]);
        setFormValues({
          name: "",
          email: "",
          message: "",
        });
      })
      .catch((error) => {
        setError(error);
      });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      {/* mapping Data in Dom */}
     <div className={styles.container}>
            {data?.map((el)=>{
                return(
                    <div key={el.id} className={styles.box}>
                    <div>
                        <img className={styles.image} src={el.image}/>
                        </div>
                    <p>Name: {el.title}</p>
                    <p>Price: {el.price}</p>
                    </div>
                )
            })}
        </div>
      <form onSubmit={handleSubmit} >
        <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            required
          />
        </label>
        </div>
        <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            required
          />
        </label>
        </div>
        <div>
        <label>
          Message:
          <textarea
            name="message"
            value={formValues.message}
            onChange={handleInputChange}
            required
          />
        </label>
        </div>
        
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Mycomponent;
