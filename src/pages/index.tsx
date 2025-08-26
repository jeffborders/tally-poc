import React, { Fragment } from 'react';
import { InferGetServerSidePropsType, NextPage } from 'next';
import { format } from "date-fns";
import { Box, Typography } from '@mui/material';
import homeGetServerSideProps from '../server-side-props/home';
import getDiscrepanciesFromInvoice from '../utils/getDiscrepanciesFromInvoice';
import DiscrepancyTable from '../components/DiscrepancyTable';

export const getServerSideProps = homeGetServerSideProps;

type HomePageRouteProps = InferGetServerSidePropsType<typeof getServerSideProps>;
const HomePageRoute: NextPage<HomePageRouteProps> = ({
  invoices,
  contracts
}) => {
  const vendorNames = Object.keys(contracts);
  const invoicesWithContract = invoices.filter((invoice) => {
    return vendorNames.includes(invoice.vendor);
  });
  const invoicesWithoutContracts = invoices.filter((invoice) => {
    return !vendorNames.includes(invoice.vendor)
  });

  return (
    <>
      <Typography variant="h4" mt={2}>Invoice discrepancies</Typography>
      {invoicesWithContract.map((invoice) => {
        const discrepancies = getDiscrepanciesFromInvoice(invoice, contracts[invoice.vendor])
        const date = format(new Date(invoice.date), "MMMM do, yyyy");

        return (
          <Fragment key={`vendor-${invoice.date}-${invoice.id}`}>
            <Box mt={4} mb={2} display="flex" alignItems="flex-end">
              <Box>
                <Typography variant="body1" fontWeight="bold">
                  {invoice.vendor} 
                </Typography>
                <Typography variant="body2">
                  Invoice ID: {invoice.id} 
                </Typography>
              </Box>
              <Typography variant="body1" fontWeight="bold" ml="auto">
                {date}
              </Typography>
            </Box>
            <DiscrepancyTable 
              invoiceId={invoice.id}
              discrepancies={discrepancies} 
            />
          </Fragment>
        );
      })} 

      <Typography variant="h4" mt={4}>Uncontracted invoice discrepancies</Typography>
      {invoicesWithoutContracts.map((invoice) => {
        const date = format(new Date(invoice.date), "MM/dd/yyyy");

        return (
          <Box key={`vendor-${invoice.date}-${invoice.id}`}>
            <Typography variant="body1" fontWeight="bold" display="inline">
              {invoice.vendor} 
            </Typography>
            <Typography variant="body1" display="inline">
              {' '}dated
            </Typography>
            <Typography variant="body1" fontWeight="bold" display="inline">
              {' '}{date}
            </Typography>
          </Box>
        )
      })}
    </>
  )
}


export default HomePageRoute;