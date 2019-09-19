const toCSV = require('./index');

const dummyData = [{
  basicInfo: {
    socialSecurity: '000-00-0000',
    firstName: 'Anakin',
    lastName: 'Skywalker',
    birthDate: '06-09-1982',
    maritalStatus: 'Single',
  },
  addresses: [
    {
      typeofContact: 1,
      company: 'Empire',
      addressLine1: 'Main Galaxy #1',
      city: 'Unknown',
      state: 'Unknown',
      zipCode: '83284',
      country: 'Unknown',
      preferredDeliveryTime: 'Morning'
    },
    {
      typeofContact: 2,
      company: 'Empire',
      addressLine1: 'Main Galaxy #2',
      city: 'Earth',
      state: 'Sun',
      zipCode: '83284',
      country: 'Milky Way',
      preferredDeliveryTime: 'Afternoon'
    }
  ],
  ignoredData: {
    foo: 'bar',
    ignored: true,
  }
}];

console.log(toCSV(dummyData, {
  'root': 'Profile Information',
  'root.basicInfo.socialSecurity': { name: 'SSN', transform: v => `***-**-${v.substr(-4)}` },
  'root.basicInfo.maritalStatus': 'Marital Status',
  'root.basicInfo.birthDate': { ignore: true },
  'root.addresses': 'Addresses',
  'root.addresses.typeofContact': 'Contact',
  'root.addresses.addressLine1': 'Address Line',
  'root.addresses.zipCode': 'Zip Code',
  'root.addresses.preferredDeliveryTime': 'Delivery Time',
  'root.ignoredData': { ignore: true }
}));
