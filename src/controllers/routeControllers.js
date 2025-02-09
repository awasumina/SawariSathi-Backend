import supabase from "../config/supabaseClient.js";

// Get all fare
export const getFare = async (req, res) => {
  try {
    const { data, error } = await supabase.from("fare").select("*"); // Fetch all fare

    if (error) {
      throw error;
    }

    res.json({ data });
  } catch (err) {
    console.error("Error fetching fare:", err.message);
    res.status(500).json({ error: "Error fetching fare" });
  }
};


export const getAllStops = async (req, res) => {
  try {
    const { data, error } = await supabase.from("stops").select("*"); // Fetch all fare

    if (error) {
      throw error;
    }

    res.json({ data });
  } catch (err) {
    console.error("Error fetching stops:", err.message);
    res.status(500).json({ error: "Error fetching stops" });
  }
};

// Get yatayat
export const getYatayatId = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("yatayat")
      .select("*")
      .eq("id", id) // Match by id
      .single(); // Expect a single record

    if (error) {
      throw error;
    }

    if (!data) {
      return res.status(404).json({ error: "yatayat not found" });
    }

    res.json({ data });
  } catch (err) {
    console.error("Error fetching yatayat:", err.message);
    res.status(500).json({ error: "Error fetching yatayat" });
  }
};




// export const getStopsForRoutes = async (req, res) => {
//   const { stop1, stop2 } = req.query; // Accept stops as query parameters
//   console.log(stop1, stop2) ;
// let { data, error } = await supabase
// .rpc('get_stops_on_common_route', {
//   "stop_id1": stop1, 
//   "stop_id2": stop2})
// if (error) console.error(error)
// else console.log(data)



  // try {
  //   console.log(`Received query for stops: stop1=${stop1}, stop2=${stop2}`);
    
  //   // Subquery 1: Get distinct route IDs for stop1
  //     const {data: routeIdsForStop1, error: routeError1 } = await supabase
  //     .from('route_stops')
  //     .select('route_id, stops(id)', { distinct: true })
  //     .eq('stops_id', stop1);

  //   if (routeError1) {
  //     console.error('Error fetching route IDs for stop1:', routeError1.message);
  //     throw routeError1;
  //   }

  //   // Subquery 2: Get distinct route IDs for stop2
  //   const {data: routeIdsForStop2, error: routeError2 } = await supabase
  //     .from('route_stops')
  //     .select('route_id, stops(id)', { distinct: true })
  //     .eq('stops_id', stop2);
      

  //   if (routeError2) {
  //     console.error('Error fetching route IDs for stop2:', routeError2.message);
  //     throw routeError2;
  //   }

  //   if (!routeIdsForStop1.length || !routeIdsForStop2.length) {
  //     return res.status(404).json({ error: 'No routes found for the provided stops.' });
  //   }

  //   // Extract route IDs and find the intersection
  //   const routeIds1 = routeIdsForStop1.map((route) => route.route_id);
  //   const routeIds2 = routeIdsForStop2.map((route) => route.route_id);
  //   const commonRouteIds = routeIds1.filter((id) => routeIds2.includes(id));

  //   if (!commonRouteIds.length) {
  //     console.log('No common routes found.');
  //     return res.status(404).json({ error: 'No common routes found for the provided stops.' });
  //   }

  //   console.log(`Found common route IDs: ${commonRouteIds.join(', ')}`);

  //   // Main query: Fetch stops for matching route IDs
  //   const { data: stops, error: stopsError } = await supabase
  //     .from('stops')
  //     .select('*, route_stops(route_id, stops_id)') // Include related 'route_stops' data
  //     .in('route_stops.route_id', commonRouteIds); // Filter by the common route IDs
  
  //   // if (stopsError) {
  //   //   console.error('Error fetching stops:', stopsError.message);
  //   //   throw stopsError;
  //   // }

  //   // console.log('Fetched stops:', stops);
   
  //   res.json({ data: stops });
  // } catch (err) {
  //   console.error('Error fetching stops for routes:', err.message);
  //   res.status(500).json({ error: 'Internal server error', message: err.message });
  // }
// };




// export const getStopsForRoutes = async (req, res) => {
//   const { stop1, stop2 } = req.query; // Accept stops as query parameters

//   try {
//     console.log(`Received query for stops: stop1=${stop1}, stop2=${stop2}`);
    
//     // Subquery 1: Get distinct route IDs for stop1
//     const { data: routeIdsForStop1, error: routeError1 } = await supabase
//       .from('route_stops')
//       .select('route_id', { distinct: true })
//       .eq('stops_id', stop1);

//     if (routeError1) {
//       console.error('Error fetching route IDs for stop1:', routeError1.message);
//       throw routeError1;
//     }

//     // Subquery 2: Get distinct route IDs for stop2
//     const { data: routeIdsForStop2, error: routeError2 } = await supabase
//       .from('route_stops')
//       .select('route_id', { distinct: true })
//       .eq('stops_id', stop2);

//     if (routeError2) {
//       console.error('Error fetching route IDs for stop2:', routeError2.message);
//       throw routeError2;
//     }

//     if (!routeIdsForStop1.length || !routeIdsForStop2.length) {
//       console.log('No common routes found.');
//       return res.status(404).json({ error: 'No routes found for the provided stops.' });
//     }

//     // Extract route IDs and find the intersection
//     const routeIds1 = routeIdsForStop1.map((route) => route.route_id);
//     const routeIds2 = routeIdsForStop2.map((route) => route.route_id);
//     const commonRouteIds = routeIds1.filter((id) => routeIds2.includes(id));

//     if (!commonRouteIds.length) {
//       console.log('No common routes found.');
//       return res.status(404).json({ error: 'No common routes found for the provided stops.' });
//     }

//     console.log(`Found common route IDs: ${commonRouteIds.join(', ')}`);

//     // Main query: Fetch stops for matching route IDs
//     const { data: stops, error: stopsError } = await supabase
//       .from('stops')
//       .select('*, route_stops(route_id, stops_id)') // Include related 'route_stops' data
//       .in('route_stops.route_id', commonRouteIds); // Filter by the common route IDs

//     if (stopsError) {
//       console.error('Error fetching stops:', stopsError.message);
//       throw stopsError;
//     }

//     // console.log('Fetched stops:', stops);
//     res.json({ data: stops });
//   } catch (err) {
//     console.error('Error fetching stops for routes:', err.message);
//     res.status(500).json({ error: 'Internal server error', message: err.message });
//   }
// };




export const getStopsForRoutes = async (req, res) => {
  const { stop1, stop2 } = req.query; // Accept stops as query parameters

  try {
    console.log(`Received query for stops: stop1=${stop1}, stop2=${stop2}`);
    
    // Subquery: Get distinct route IDs where stops_id matches stop1 or stop2
    const { data: routeIds, error: routeError } = await supabase
      .from('route_stops')
      .select('route_id', { distinct: true })
      .or(`stops_id.eq.${stop1},stops_id.eq.${stop2}`); // Use `or` for multiple conditions

    if (routeError) {
      console.error('Error fetching route IDs:', routeError.message);
      throw routeError;
    }

    if (!routeIds || !routeIds.length) {
      console.log('No route IDs found.');
      return res.status(404).json({ error: 'No routes found for the provided stops.' });
    }

    const routeIdList = routeIds.map((route) => route.route_id);
    console.log(`Found route IDs: ${routeIdList.join(', ')}`);

    // Main query: Fetch stops for matching route IDs using table relationships
    const { data: stops, error: stopsError } = await supabase
      .from('stops')
      .select('*, route_stops(route_id, stops_id)') // Include related 'route_stops' data
      .in('route_stops.route_id', routeIdList); // Filter by the route IDs

    if (stopsError) {
      console.error('Error fetching stops:', stopsError.message);
      throw stopsError;
    }


     // Fetch fares data
     const { data: fare, error: fareError } = await supabase
     .from('fare')
     .select('*')
     .eq('stops_from_id', stop1)
     .eq('stops_to_id', stop2)
     .single(); // Assuming only one fare exists per route

   if (fareError && fareError.code !== 'PGRST116') { // Ignore "no rows found" error
     console.error('Error fetching fare:', fareError.message);
     throw fareError;
   }

   res.json({ data: { stops, fare } });


    // console.log('Fetched stops:', stops);
    // res.json({ data: stops });
  } catch (err) {
    console.error('Error fetching stops for routes:', err.message);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
};






// API to fetch image URL dynamically
export const getVehicleImage = async (req, res) => {
  try {
    // Get bucketName and filePath from query parameters
    const { bucketName, filePath } = req.query;

    if (!bucketName || !filePath) {
      return res.status(400).json({ error: 'Missing bucketName or filePath in query parameters' });
    }

    // Generate a public URL for the image
    const { data, error } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    if (error) {
      throw error;
    }

    res.json({ imageUrl: data.publicUrl });
  } catch (err) {
    console.error('Error fetching image URL:', err.message);
    res.status(500).json({ error: 'Error fetching image URL' });
  }
};






// // Create a new child account
// export const createChildAccount = async (req, res) => {
//     const {
//       child_id,
//       gender,
//       name,
//       date_of_birth,
//       weight_at_birth,
//       mother_name,
//       father_name,
//       province,
//       municipality,
//       ward_no,
//       village,
//       phone,
//       email,
//       health_institution_name,
//       health_worker_assigned,
//       date_of_card_made,
//       temporary_password,
//     } = req.body;
  
//     if (
//       !child_id ||
//       !gender ||
//       !name ||
//       !date_of_birth ||
//       !mother_name ||
//       !father_name ||
//       !province ||
//       !municipality ||
//       !ward_no ||
//       !village ||
//       !phone ||
//       !health_institution_name ||
//       !health_worker_assigned ||
//       !date_of_card_made ||
//       !temporary_password
//     ) {
//       return res.status(400).json({ error: "All fields are required" });
//     }
  
//     try {
//       const { data, error } = await supabase.from("children").insert([
//         {
//           child_id,
//           gender,
//           name,
//           date_of_birth,
//           weight_at_birth,
//           mother_name,
//           father_name,
//           province,
//           municipality,
//           ward_no,
//           village,
//           phone,
//           email,
//           health_institution_name,
//           health_worker_assigned,
//           date_of_card_made,
//           temporary_password,
//         },
//       ]);
  
//       res.status(201).json({
//         message: `Child account ${name} has been created.`,
//         data: data[0], // Send the first (and only) inserted child
//       });
//     } catch (err) {
//       console.error("Error in try-catch block when adding child:", err); // Log detailed error
//       res
//         .status(500)
//         .json({ error: "Error creating child account", details: err.message }); // Return error with message
//     }
//   };







// // Update a child account
// export const updateChildAccount = async (req, res) => {
//     const { id } = req.params;
//     const {
//       child_id,
//       gender,
//       name,
//       date_of_birth,
//       weight_at_birth,
//       mother_name,
//       father_name,
//       province,
//       municipality,
//       ward_no,
//       village,
//       phone,
//       email,
//       health_institution_name,
//       health_worker_assigned,
//       date_of_card_made,
//       temporary_password,
//     } = req.body;
  
//     try {
//       const { data, error } = await supabase
//         .from("children")
//         .update({
//           child_id,
//           gender,
//           name,
//           date_of_birth,
//           weight_at_birth,
//           mother_name,
//           father_name,
//           province,
//           municipality,
//           ward_no,
//           village,
//           phone,
//           email,
//           health_institution_name,
//           health_worker_assigned,
//           date_of_card_made,
//           temporary_password,
//         })
//         .eq("child_id", id); // Match by child_id
  
//       if (error) {
//         throw error;
//       }
  
//       if (data.length === 0) {
//         return res.status(404).json({ error: "Child not found" });
//       }
  
//       res.json({ message: `Child account with ID ${id} has been updated.` });
//     } catch (err) {
//       console.error("Error updating child account:", err.message);
//       res.status(500).json({ error: "Error updating child account" });
//     }
//   };
  
//   // Delete a child account
//   export const deleteChildAccount = async (req, res) => {
//     const { id } = req.params;
  
//     try {
//       const { data, error } = await supabase
//         .from("children")
//         .delete()
//         .eq("child_id", id); // Match by child_id
  
//       if (error) {
//         throw error;
//       }
  
//       if (data.length === 0) {
//         return res.status(404).json({ error: "Child not found" });
//       }
  
//       res.json({ message: `Child account with ID ${id} has been deleted.` });
//     } catch (err) {
//       console.error("Error deleting child account:", err.message);
//       res.status(500).json({ error: "Error deleting child account" });
//     }
//   };
  
  
