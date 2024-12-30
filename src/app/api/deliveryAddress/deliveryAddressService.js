import baseUrl from '../BaseUrl';
import axios from 'axios';

const deliveryAddressService = {
  getDeliveryAddress: async () => {
    const token = localStorage.getItem('token'); // Ganti 'token' dengan nama kunci yang sesuai jika berbeda
    // Buat header Authorization
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Tambahkan token ke header
      },
    };
    try {
      const response = await axios.get(
        `${baseUrl}/api/delivery-addresses`,
        config,
      );
      return response.data;
    } catch (err) {
      return err.response;
    }
  },
};

export default deliveryAddressService;
