import { supabase } from "../config/supabase.js";

export const addVehicle = async (req, res) => {
  const { owner_id, name, registration_number, allowed_passengers, rate_per_km } = req.body;

  const { data: owner } = await supabase
    .from("users")
    .select("role")
    .eq("id", owner_id)
    .single();

  if (owner.role !== "owner") {
    return res.status(403).json({ message: "Only owners can add vehicles" });
  }

  const { error } = await supabase.from("vehicles").insert([{
    owner_id,
    name,
    registration_number,
    allowed_passengers,
    rate_per_km
  }]);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: "Vehicle added" });
};

export const assignDriver = async (req, res) => {
  const { driver_id } = req.body;

  await supabase
    .from("vehicles")
    .update({ driver_id })
    .eq("id", req.params.vehicleId);

  res.json({ message: "Driver assigned" });
};

export const getVehicle = async (req, res) => {
  const { data } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", req.params.vehicleId)
    .single();

  res.json(data);
};
