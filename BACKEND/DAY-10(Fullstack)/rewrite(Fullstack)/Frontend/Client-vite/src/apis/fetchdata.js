import axios from 'axios';
async function getdata() {
  try {
    const res = await axios.get("http://localhost:3000/api/home");
    return res.data.fetcheddata;
  } catch (err) {
    console.log(err);
  }
}

export default getdata;