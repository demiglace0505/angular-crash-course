package com.demiglace.flightservices.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demiglace.flightservices.entities.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

}
