import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import useOrder from "../../hooks/useOrder";
import TopSellingProduct from "../../components/SalesReportComponents/TopSellingProducts";
import MostFrequentCustomer from "../../components/SalesReportComponents/MostFrequentCustomer";
import PeriodPerformance from "../../components/SalesReportComponents/PeriodPerformance";

const getLocalDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${month}-${day}-${year}`;
};

const SalesReportScreen = () => {
  const { orders } = useOrder();

  const [reportDate, setReportDate] = useState( () => getLocalDate(new Date()));

  // const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;

    if (selectedDate) {
      setReportDate(selectedDate);
    }
  };

  /*
  const handlePhoneDateChange = (event, selectedDate) => {
    setShowDatePicker(false);

    if (selectedDate) {
      setReportDate(getLocalDate(selectedDate));
    }
  };
  */

  return (
    <ScrollView className="flex-1 bg-[#F7FBF8] px-4 pt-4 pb-10">
      <View className="mb-6 mt-2">
        <Text className="text-[#6B8F82] text-sm ml-8">
          Overview · Business performance
        </Text>
      </View>

      <View className="mb-6">
        <Text className="text-[#1F5A4B] font-semibold mb-2">
          Report period
        </Text>

        {Platform.OS === "web" ? (
          <View className="flex-row items-center justify-between bg-[#FFFDF9] border border-[#E6EFE7] rounded-lg px-4 py-3">
            <View className="flex-row items-center flex-1">
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#1F5A4B"
              />

              <Text className="text-[#1F5A4B] font-medium text-base ml-2">
                {reportDate}
              </Text>
            </View>

            <input
              type="date"
              value={reportDate}
              onChange={handleDateChange}
              aria-label="Select report date"
              style={{
                border: "none",
                background: "transparent",
                color: "transparent",
                fontSize: "14px",
                cursor: "pointer",
                maxWidth: "145px",
              }}
            />
          </View>
        ) : (
          <Pressable
            // onPress={() => setShowDatePicker(true)}
            onPress={() => {}}
            className="flex-row items-center justify-between bg-[#FFFDF9] border border-[#E6EFE7] rounded-lg px-4 py-3"
          >
            <View className="flex-row items-center">
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#1F5A4B"
                className="mr-2"
              />

              <Text className="text-[#1F5A4B] font-medium text-base">
                {reportDate}
              </Text>
            </View>

            <Ionicons
              name="chevron-down"
              size={16}
              color="#1F5A4B"
            />
          </Pressable>
        )}

        {/*

          {showDatePicker && (
            <DateTimePicker
              value={new Date(`${reportDate}T12:00:00`)}
              mode="date"
              display="default"
              onChange={handlePhoneDateChange}
            />
          )}
        */}
      </View>

      <View className="flex-row items-center bg-[#EAF4EE] rounded-lg p-3 mb-6 border border-[#D1E8D5]">
        <Ionicons
          name="information-circle-outline"
          size={20}
          color="#1F5A4B"
        />

        <Text className="text-[#1F5A4B] text-xs ml-2 flex-1">
          Showing data for the selected period. Select a different
          date to view past records.
        </Text>
      </View>

      <PeriodPerformance date={reportDate} orders={orders} />

      <MostFrequentCustomer orders={orders} date={reportDate} />

      <TopSellingProduct orders={orders} date={reportDate} />
    </ScrollView>
  );
};

export default SalesReportScreen;
