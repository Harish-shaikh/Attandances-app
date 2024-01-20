import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { TbDoorEnter, TbDoorExit } from "react-icons/tb";
import { toast } from "sonner";

const Attendance = () => {
  const { user } = useContext(AuthContext);
  const [todaysAttendance, setTodaysAttendance] = useState();
  const navigate = useNavigate();

  const getTodaysAttendance = useCallback(async () => {
    if (user) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/attendance/user/${user._id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch attendance data");
        }

        const data = await response.json();
        const todaysDate = new Date();

        data.attendanceRecords.forEach((record) => {
          const recDate = new Date(record.date);
          console.log(recDate);
          if (recDate.getDate() === todaysDate.getDate()) {
            setTodaysAttendance(record);
          }
        });
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    } else navigate("/login");
  }, [navigate, user]);

  useEffect(() => {
    getTodaysAttendance();
  }, [getTodaysAttendance]);

  const handlePunchIn = async () => {
    if (user) {
      if (!todaysAttendance) {
        try {
          const response = await fetch(
            "http://localhost:5000/api/attendance/punchin",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ userId: user._id }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            toast.success(data.message);
          } else {
            const data = await response.json();
            toast.error(data.message);
          }
        } catch (error) {
          toast.error("Server error");
        }
      } else toast.error("Already Punched In");
    }
  };

  const handlePunchOut = async () => {
    if (user) {
      if (!todaysAttendance.punchOutTime) {
        try {
          const response = await fetch(
            "http://localhost:5000/api/attendance/punchout",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ userId: user._id }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            toast.success(data.message);
          } else {
            const data = await response.json();
            toast.error(data.message);
          }
        } catch (error) {
          toast.error("Server error");
        }
      } else toast.error("Already Punched Out");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div>
        <h1 className="text-2xl font-bold">
          Your{"  "}
          <span className="underline decoration-wavy decoration-primary">
            Attendance
          </span>
        </h1>
      </div>
      <p className="my-4">
        <span className="underline decoration-wavy decoration-primary">
          Welcome
        </span>{" "}
        {user ? user.username : ""}
      </p>

      <div className="flex justify-between items-center">
        <div
          className={`text-center border-4 p-4 m-2 rounded-xl border-secondary cursor-pointer w-36 ${
            todaysAttendance && "grayscale"
          }`}
          onClick={handlePunchIn}
        >
          <div className="bg-secondary rounded-full aspect-square flex justify-center items-center">
            <TbDoorEnter className="text-5xl" />
          </div>
          <h4 className="font-bold text-lg text-secondary">Punch In</h4>

          {todaysAttendance && (
            <p className="text-xs">
              {new Date(todaysAttendance.punchInTime).toLocaleTimeString()}
            </p>
          )}
        </div>

        <div
          className={`text-center border-4 p-4 m-2 rounded-xl border-secondary cursor-pointer w-36 ${
            todaysAttendance.punchOutTime && "grayscale"
          }`}
          onClick={handlePunchOut}
        >
          <div className="bg-secondary rounded-full aspect-square flex justify-center items-center">
            <TbDoorExit className="text-5xl" />
          </div>
          <h4 className="font-bold text-lg text-secondary">Punch Out</h4>

          {todaysAttendance.punchOutTime && (
            <p className="text-xs">
              {new Date(todaysAttendance.punchOutTime).toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>

      {todaysAttendance.punchOutTime && (
        <p className="font-bold">
          Status:{" "}
          <span className="underline decoration-wavy decoration-primary">
            {todaysAttendance.status}
          </span>
        </p>
      )}
    </div>
  );
};

export default Attendance;
