import axios from 'axios';

export const listService = axios.create({
    baseURL: 'https://clinicaltables.nlm.nih.gov/api/npi_org/v3/search?df=name.full,NPI,provider_type,addr_practice.full&authenticity_token=&terms=',
    headers: {
        'Content-Type': 'application/json'
        }
});
export const coordsService = axios.create({ 
    baseURL: 'http://api.positionstack.com/v1/'
});
export const detailService = axios.create({ 
    baseURL: 'http://localhost:8080'
});





