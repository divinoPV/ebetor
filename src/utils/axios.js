import axios from 'axios';

const apiKey = 'rSIyOg7nbZcU986SBPuNh1WzEGQNP33I-rsFWOBvcP8VuKvGkVE';

const baseAxios = axios.create({
  baseURL: 'https://api.pandascore.co',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${apiKey}`
  },
  method: 'GET'
});

export default baseAxios;
