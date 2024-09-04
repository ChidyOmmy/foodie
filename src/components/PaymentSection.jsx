import { Box, Stack, TextField, Typography } from "@mui/material";
import PayCard from "../components/PayCard";

const PaymentSection = ({ order, updateOrderField }) => {
  return (
    <>
      <Typography>
        You can pay right away through M-Pesa, Tigo Pesa, or HaloPesa
      </Typography>
      <Stack
        sx={{
          maxWidth: "100%",
          justifyContent: "space-between",
          alignItems: "center"
        }}
        spacing={1}
        direction={{ xs: "column", sm: "row" }}>
        <PayCard
          title='Vodacom Pay Number'
          name='Foodies Point'
          payNumber='56789'
          color='#e32730'
        />
        <PayCard
          title='Tigo Pay Number'
          name='Foodies Point'
          payNumber='98765'
          color='#14661d'
        />
        <PayCard
          title='Halotel Pay Number'
          name='Foodies Point'
          payNumber='65432'
          color='tomato'
        />
      </Stack>
      <Typography mb={2}>
        Please enter the transaction code before continuing with the purchase to
        confirm the payment.
      </Typography>
      <TextField
        value={order.transaction}
        onChange={(event) =>
          updateOrderField("transaction", event.target.value)
        }
        id='transaction-code'
        label='Transaction code'
        variant='outlined'
        sx={{ width: "35ch" }}
      />
    </>
  );
};

export default PaymentSection;
