package com.demiglace.flightservices.integration;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.demiglace.flightservices.dto.CreateReservationRequest;
import com.demiglace.flightservices.dto.UpdateReservationRequest;
import com.demiglace.flightservices.entities.Flight;
import com.demiglace.flightservices.entities.Passenger;
import com.demiglace.flightservices.entities.Reservation;
import com.demiglace.flightservices.repos.FlightRepository;
import com.demiglace.flightservices.repos.PassengerRepository;
import com.demiglace.flightservices.repos.ReservationRepository;

@RestController
public class ReservationRestController {

	@Autowired
	FlightRepository flightRepository;

	@Autowired
	PassengerRepository passengerRepository;

	@Autowired
	ReservationRepository reservationRepository;

	@RequestMapping(value = "/flights", method = RequestMethod.GET)
	public List<Flight> findFlights(@RequestParam("from") String from, @RequestParam("to") String to,
			@RequestParam("departureDate") @DateTimeFormat(pattern = "MM-dd-yyyy") Date departureDate) {
		return flightRepository.findFlights(from, to, departureDate);
//		return flightRepository.findAll();
	}
	
	@RequestMapping(value="/flights/{id}", method=RequestMethod.GET)
	public Flight findFlight(@PathVariable("id") int id) {
		return flightRepository.findById(id).get();
	}

	@RequestMapping(value = "/reservations", method = RequestMethod.POST)
	@Transactional
	public Reservation saveReservation(@RequestBody CreateReservationRequest request) {
		// find the flight based on request flight id
		Flight flight = flightRepository.findById(request.getFlightId()).get();

		// create a passenger object based on the request object
		Passenger passenger = new Passenger();
		passenger.setFirstName(request.getPassengerFirstName());
		passenger.setLastName(request.getPassengerLastName());
		passenger.setMiddleName(request.getPassengerMiddleName());
		passenger.setEmail(request.getPassengerEmail());
		passenger.setPhone(request.getPassengerPhone());

		// save passenger to database
		Passenger savedPassenger = passengerRepository.save(passenger);

		// create the reservation
		Reservation reservation = new Reservation();
		reservation.setFlight(flight);
		reservation.setPassenger(savedPassenger);
		reservation.setCheckedIn(false);

		// save the reservation to database
		Reservation savedReservation = reservationRepository.save(reservation);

		return savedReservation;
	}

	@RequestMapping(value = "/reservations/{id}", method = RequestMethod.GET)
	public Reservation findReservation(@PathVariable("id") int id) {
		return reservationRepository.findById(id).get();
	}

	@RequestMapping(value = "/reservations", method = RequestMethod.PUT)
	public Reservation updateReservation(@RequestBody UpdateReservationRequest request) {
		Reservation reservation = reservationRepository.findById(request.getId()).get();
		reservation.setNumberOfBags(request.getNumberOfBags());
		reservation.setCheckedIn(request.isCheckIn());

		return reservationRepository.save(reservation);
	}
}
