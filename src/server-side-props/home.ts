import { GetServerSideProps } from 'next';
import dotenv from 'dotenv';
import parseInvoices from '../utils/parseInvoices';

dotenv.config();

// mock retrieval of contracts and invoices from server
// if invoice retrieval fails, regenerate
// to simulate, change the invoicePath constant below
const invoicePath = '68acb028ae596e708fd598b9';
const jsonBinRoot = 'https://api.jsonbin.io/v3';
const headers = {
  'X-Master-Key': process.env.JSONBIN_MASTER_API_KEY as string,
  'X-Access-Key': process.env.JSONBIN_ACCESS_API_KEY as string
}

const getInvoices = async (): Promise<Invoice[]> => {
  const invoicesFetch = await fetch(`${jsonBinRoot}/b/${invoicePath}`, {
    headers
  });
  
  if (!invoicesFetch.ok) {
    throw new Error(`Failed to fetch data: ${invoicesFetch.status}`);
  }

  const { record: invoices } = await invoicesFetch.json();
  
  return invoices;
}

const getContracts = async (): Promise<Contracts> => {
  const contractsPath = '68acb03643b1c97be929e081';
  const contractsFetch = await fetch(`${jsonBinRoot}/b/${contractsPath}`, {
    headers
  });
  const { record: contracts } = await contractsFetch.json();
  
  return contracts;
}

const homeGetServerSideProps: GetServerSideProps<{
  contracts: Contracts;
  invoices: Invoice[];
}> = async () => {
  try {
    const invoices = await getInvoices();
    const contracts = await getContracts();
    
    return {
      props: {
        contracts,
        invoices
      }
    }
  } catch(err) {
    console.error(err);
    const contracts = await getContracts();
    const invoices = await parseInvoices(contracts);

    return {
      props: {
        contracts,
        invoices
      }
    }
  }
};

export default homeGetServerSideProps;