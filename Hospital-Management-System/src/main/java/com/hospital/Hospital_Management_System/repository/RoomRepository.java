package com.hospital.Hospital_Management_System.repository;

import com.hospital.Hospital_Management_System.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RoomRepository extends JpaRepository<Room , Long> {
    @Query("select sum(r.availableBeds) from Room r")
    Long sumAvailableBeds();

    @Query("select sum(r.totalBeds) from Room r")
    Long sumTotalBeds();
}
