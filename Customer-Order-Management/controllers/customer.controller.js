import { supabase } from "../config/supabase.js";

export const registerCustomer = async (req, res) => {
  const { full_name, email, phone } = req.body;

  const { data, error } = await supabase
    .from("customers")
    .insert([{ full_name, email, phone }])
    .select();

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.status(201).json({
    message: "Customer registered",
    data
  });
};

export const getAllCustomers = async (req, res) => {
  const { data, error } = await supabase.from("customers").select("*");

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.json(data);
};

export const getCustomerById = async (req, res) => {
  const { customerId } = req.params;

  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("id", customerId)
    .single();

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.json(data);
};
