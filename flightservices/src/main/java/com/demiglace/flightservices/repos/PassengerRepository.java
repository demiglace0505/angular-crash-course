package com.demiglace.flightservices.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demiglace.flightservices.entities.Passenger;

public interface PassengerRepository extends JpaRepository<Passenger, Integer> {

}
