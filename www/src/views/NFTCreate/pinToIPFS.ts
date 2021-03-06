const axios = require('axios')

export const PINATA_BASE_GATEWAY_URL = 'https://gateway.pinata.cloud/ipfs/'

export const pinFileToIPFS = (file: File) => {
  const { REACT_APP_PINATA_API, REACT_APP_PINATA_API_SECRET } = process.env
  const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS'

  // we gather a local file for this example, but any valid readStream source will work here.
  const data = new FormData()
  data.append('file', file)

  return axios.post(url,
    data,
    {
      maxContentLength: 'Infinity', // this is needed to prevent axios from erroring out with large files
      headers: {
        'Content-Type': 'multipart/form-data;',
        pinata_api_key: REACT_APP_PINATA_API,
        pinata_secret_api_key: REACT_APP_PINATA_API_SECRET,
      },
    })
}

interface pinJSONToIPFSInterface {
  name: string,
  description?: string,
  image: string,
}

export const pinJSONToIPFS = (JSONBody: pinJSONToIPFSInterface) => {
  const { REACT_APP_PINATA_API, REACT_APP_PINATA_API_SECRET } = process.env
  const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS'
  return axios
    .post(
      url,
      JSONBody,
      {
        headers: {
          pinata_api_key: REACT_APP_PINATA_API,
          pinata_secret_api_key: REACT_APP_PINATA_API_SECRET,
        },
      },
    )
}
