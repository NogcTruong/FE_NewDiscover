import "./destinationList.css";
import mountain from "../../assets/img/mountain.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ListDestination = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { planData } = location.state || {};
  const [numberOfPeople, setNumberOfPeople] = useState(0);

  useEffect(() => {
    if (planData?.quantity) {
      setNumberOfPeople(planData.quantity);
    }
  }, [planData]);

  const calculateAverageRating = (destinations) => {
    if (!destinations || destinations.length === 0) return 0;

    const totalRating = destinations.reduce((sum, dest) => {
      // Nếu rating không tồn tại hoặc không hợp lệ, coi như 0
      const rating = parseFloat(dest.rating) || 0;
      return sum + rating;
    }, 0);

    return (totalRating / destinations.length).toFixed(1);
  };

  const averageRating = calculateAverageRating(planData?.selectedTrips);

  const handleLearnMore = (destination, index, dayIndex) => {
    navigate("/detailDestination", {
      state: {
        currentDestination: destination,
        allDestinations: planData?.selectedTrips,
        currentIndex: index,
        selectedDay: dayIndex + 1,
        userRequireId: planData?.userRequireId,
        quantity: planData?.quantity,
        totalCost: planData?.totalCost,
      },
    });
  };

  const handleDayClick = (dayIndex) => {
    const startIndex = dayIndex * 3;
    const endIndex = startIndex + 3;
    const dayDestinations = planData?.selectedTrips.slice(startIndex, endIndex);

    if (dayDestinations && dayDestinations.length > 0) {
      navigate("/detailDestination", {
        state: {
          currentDestination: dayDestinations[0],
          allDestinations: planData.selectedTrips,
          selectedDay: dayIndex + 1,
        },
      });
    }
  };

  const groupDestinationsByDay = (destinations) => {
    const groups = [];
    if (destinations) {
      for (let i = 0; i < destinations.length; i += 3) {
        groups.push(destinations.slice(i, i + 3));
      }
    }
    return groups;
  };

  const groupedDestinations = groupDestinationsByDay(planData?.selectedTrips);

  const calculateTotalForDestination = (price) => {
    return price * numberOfPeople;
  };

  const handleImageError = (e) => {
    e.target.src = mountain;
  };

  console.log(groupedDestinations);

  // Tổ chức dữ liệu theo ngày
  const organizeByDays = () => {
    const trips = planData?.selectedTrips || [];
    const tripsPerDay = 3;
    const organized = [];

    for (let i = 0; i < trips.length; i += tripsPerDay) {
      organized.push(trips.slice(i, i + tripsPerDay));
    }

    return organized;
  };

  const organizedTrips = organizeByDays();

  return (
    <div className="list-destination-container">
      <div className="container">
        <h1 className="card-title">Khám phá kế hoạch du lịch của chúng tôi</h1>
        <p className="card-detail">
          Tôi đề xuất những địa điểm vì đã có những người có cùng mục tiêu như
          bạn và cho đánh giá cao: Được đánh giá {averageRating} về những địa
          điểm này.
        </p>
        {organizedTrips.map((group, dayIndex) => (
          <div key={dayIndex} className="day-group">
            <h2 className="day-title" onClick={() => handleDayClick(dayIndex)}>
              Ngày {dayIndex + 1}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="arrow-icon"
              >
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
              </svg>
            </h2>
            <div className="card">
              {group.map((destination, index) => (
                <div className="card-item" key={destination._id}>
                  <span className="card-day-title">
                    {index === 0
                      ? "Buổi Sáng"
                      : index === 1
                      ? "Buổi Chiều"
                      : "Buổi Tối"}
                  </span>
                  <figure className="card-item-figure">
                    <img
                      className="card-item-img"
                      src={
                        Array.isArray(destination.image_url) &&
                        destination.image_url.length > 0
                          ? destination.image_url[0]
                          : mountain
                      }
                      alt={destination.name}
                      onClick={() =>
                        handleLearnMore(destination, index, dayIndex)
                      }
                      onError={handleImageError}
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{destination.name}</h2>
                    <div className="card-body-item">
                      <span>Loại: </span>
                      <span>{destination.category}</span>
                    </div>
                    <div className="card-body-item">
                      <span>Địa điểm: </span>
                      <span>{destination.location}</span>
                    </div>
                    <div className="card-body-item">
                      <span>Giá/người: </span>
                      <span>{destination.price.toLocaleString()} VNĐ</span>
                    </div>
                    <div className="card-body-item">
                      <span>Tổng tiền ({numberOfPeople} người): </span>
                      <span>
                        {calculateTotalForDestination(
                          destination.price
                        ).toLocaleString()}{" "}
                        VNĐ
                      </span>
                    </div>
                    <button
                      className="btn btn-plan-list"
                      type="submit"
                      onClick={() =>
                        handleLearnMore(destination, index, dayIndex)
                      }
                    >
                      Tìm hiểu thêm
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListDestination;
