import { supabase } from "../config/supabase.js";

export const createTrip = async (req, res) => {
  const { customer_id, vehicle_id, passengers, distance_km } = req.body;

  const { data: vehicle, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", vehicle_id)
    .maybeSingle(); 

  if (error || !vehicle) {
    return res.status(404).json({ message: "Vehicle not found" });
  }

  if (vehicle.isAvailable !== true) {
  return res.status(400).json({ message: "Vehicle not available" });
}

  if (passengers > vehicle.allowed_passengers) {
    return res.status(400).json({ message: "Passenger limit exceeded" });
  }

  const { error: tripError } = await supabase
    .from("trips")
    .insert([
      {
        customer_id,
        vehicle_id,
        passengers,
        distance_km
      }
    ]);

  if (tripError) {
    return res.status(400).json({ error: tripError.message });
  }

  await supabase
    .from("vehicles")
    .update({ isAvailable: false })
    .eq("id", vehicle_id);

  return res.status(201).json({
    message: "Trip created successfully"
  });
};

export const endTrip = async (req, res) => {
  const { tripId } = req.params;

  const { data: trip, error: tripError } = await supabase
    .from("trips")
    .select("*")
    .eq("id", tripId)
    .maybeSingle();

  if (tripError || !trip) {
    return res.status(404).json({ message: "Trip not found" });
  }

  if (trip.isCompleted) {
    return res.status(400).json({ message: "Trip already completed" });
  }

  const { data: vehicle, error: vehicleError } = await supabase
    .from("vehicles")
    .select("rate_per_km")
    .eq("id", trip.vehicle_id)
    .maybeSingle();

  if (vehicleError || !vehicle) {
    return res.status(404).json({ message: "Vehicle not found" });
  }

  const tripCost = trip.distance_km * vehicle.rate_per_km;

  await supabase
    .from("trips")
    .update({
      isCompleted: true,
      tripCost
    })
    .eq("id", tripId);

  await supabase
    .from("vehicles")
    .update({ isAvailable: true })
    .eq("id", trip.vehicle_id);

  return res.json({
    message: "Trip ended successfully",
    tripCost
  });
};

export const getTrip = async (req, res) => {
  const { tripId } = req.params;

  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .eq("id", tripId)
    .maybeSingle();

  if (error || !data) {
    return res.status(404).json({ message: "Trip not found" });
  }

  res.json(data);
};

export const deleteTrip = async (req, res) => {
  const { tripId } = req.params;

  const { error } = await supabase
    .from("trips")
    .delete()
    .eq("id", tripId);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ message: "Trip deleted successfully" });
};
