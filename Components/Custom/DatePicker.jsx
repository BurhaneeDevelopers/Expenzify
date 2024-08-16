import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from "react-native";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const CustomCalendarPicker = ({ onDateChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("date"); // 'date', 'month', 'year'
  const [selectedDate, setSelectedDate] = useState(new Date());

  const years = [...Array(100).keys()].map((i) => i + 1920);

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handlePrev()}>
          <Text style={styles.headerText}>
            {mode === "year"
              ? "Prev Years"
              : mode === "month"
              ? "Prev Year"
              : "Prev Month"}
          </Text>
        </TouchableOpacity>
        <Text
          style={styles.headerTitle}
          onPress={() => setMode(mode === "date" ? "month" : "date")}
        >
          {mode === "date"
            ? `${
                monthNames[selectedDate.getMonth()]
              } ${selectedDate.getFullYear()}`
            : mode === "month"
            ? selectedDate.getFullYear()
            : "Select Year"}
        </Text>
        <TouchableOpacity onPress={() => handleNext()}>
          <Text style={styles.headerText}>
            {mode === "year"
              ? "Next Years"
              : mode === "month"
              ? "Next Year"
              : "Next Month"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handlePrev = () => {
    if (mode === "date") {
      const prevMonth = new Date(
        selectedDate.setMonth(selectedDate.getMonth() - 1)
      );
      setSelectedDate(new Date(prevMonth));
    } else if (mode === "month") {
      const prevYear = new Date(
        selectedDate.setFullYear(selectedDate.getFullYear() - 1)
      );
      setSelectedDate(new Date(prevYear));
    } else if (mode === "year") {
      const prevYears = new Date(
        selectedDate.setFullYear(selectedDate.getFullYear() - 12)
      );
      setSelectedDate(new Date(prevYears));
    }
  };

  const handleNext = () => {
    if (mode === "date") {
      const nextMonth = new Date(
        selectedDate.setMonth(selectedDate.getMonth() + 1)
      );
      setSelectedDate(new Date(nextMonth));
    } else if (mode === "month") {
      const nextYear = new Date(
        selectedDate.setFullYear(selectedDate.getFullYear() + 1)
      );
      setSelectedDate(new Date(nextYear));
    } else if (mode === "year") {
      const nextYears = new Date(
        selectedDate.setFullYear(selectedDate.getFullYear() + 12)
      );
      setSelectedDate(new Date(nextYears));
    }
  };

  const renderDays = () => {
    const firstDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    ).getDay();
    const daysInMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    ).getDate();

    let blanks = [];
    for (let i = 0; i < firstDay; i++) {
      blanks.push(<View style={styles.day} key={`empty-${i}`} />);
    }

    let daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(
        <TouchableOpacity
          key={`day-${i}`}
          style={[
            styles.day,
            selectedDate.getDate() === i ? styles.selectedDay : null,
          ]}
          onPress={() => {
            const newDate = new Date(selectedDate.setDate(i));
            setSelectedDate(new Date(newDate));
            onDateChange(newDate);
            setShowModal(false);
          }}
        >
          <Text
            style={styles.dayText}
            className={`${selectedDate.getDate() === i && "text-white"}`}
          >
            {i}
          </Text>
        </TouchableOpacity>
      );
    }

    return [...blanks, ...daysArray];
  };

  const renderMonths = () => {
    return monthNames.map((month, index) => (
      <TouchableOpacity
        key={`month-${index}`}
        style={styles.month}
        onPress={() => {
          const newDate = new Date(selectedDate.setMonth(index));
          setSelectedDate(new Date(newDate));
          setMode("date");
        }}
      >
        <Text style={styles.monthText}>{month}</Text>
      </TouchableOpacity>
    ));
  };

  const renderCalendar = () => {
    if (mode === "date") {
      return <View style={styles.daysContainer}>{renderDays()}</View>;
    } else if (mode === "month") {
      return <View style={styles.monthsContainer}>{renderMonths()}</View>;
    }
  };

  return (
    <View>

      <Text className="mt-5 mb-2">Select Date</Text>
      <Pressable
        onPress={() => setShowModal(true)}
        className="p-2 border border-[#3B47DE] w-44 rounded-lg"
      >
        <Text className="text-center">{selectedDate.toDateString()}</Text>
      </Pressable>
      <Modal
        transparent={true}
        visible={showModal}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            {renderHeader()}
            {renderCalendar()}

            <Text
              onPress={() => setShowModal(false)}
              className="text-indigo-600 flex-row text-end mt-4 w-full"
            >
              Close
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomCalendarPicker;

const styles = StyleSheet.create({
  dateButton: {
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 5,
    alignItems: "center",
  },
  dateText: {
    color: "#fff",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 14,
    color: "#007AFF",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  day: {
    width: "14.28%",
    alignItems: "center",
    paddingVertical: 10,
  },
  dayText: {
    fontSize: 16,
  },
  selectedDay: {
    backgroundColor: "#007AFF",
    borderRadius: 5,
  },
  monthsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  month: {
    width: "30%",
    alignItems: "center",
    paddingVertical: 20,
  },
  monthText: {
    fontSize: 16,
  },
  yearsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  year: {
    width: "30%",
    alignItems: "center",
    paddingVertical: 20,
  },
  yearText: {
    fontSize: 16,
  },
});
