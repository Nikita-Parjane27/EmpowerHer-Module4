import { supabase } from "../config/supabase.js";

export const createOrder = async (req, res) => {
  const { product_name, quantity, price, customerId } = req.body;

  if (!product_name || !quantity || !price || !customerId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        product_name,
        quantity,
        price,
        customer_id: customerId
      }
    ]);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.status(201).json({ message: "Order created", data });
};

export const getOrdersByCustomer = async (req, res) => {
  const { customerId } = req.params;

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("customer_id", customerId);

  if (error) return res.status(400).json({ message: error.message });

  res.json(data);
};

export const updateOrder = async (req, res) => {
  const { orderId } = req.params;

  const { data, error } = await supabase
    .from("orders")
    .update(req.body)
    .eq("id", orderId);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.json({ message: "Order updated", data });
};

export const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  const { error } = await supabase
    .from("orders")
    .delete()
    .eq("id", orderId);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.json({ message: "Order deleted" });
};

