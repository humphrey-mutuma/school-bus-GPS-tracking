import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { onboarding } from "@/constants";
import { Text, TextInput, Button } from "react-native-paper";

export default function Welcome() {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          router.replace("/(root)/(tabs)/home");
        }}
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          padding: 20,
        }}
      >
        <Text style={{ color: "black", fontSize: 16, fontWeight: "600" }}>
          Skip
        </Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View
            style={{
              width: 32,
              height: 4,
              marginHorizontal: 4,
              backgroundColor: "#E2E8F0",
              borderRadius: 9999,
            }}
          />
        }
        activeDot={
          <View
            style={{
              width: 32,
              height: 4,
              marginHorizontal: 4,
              backgroundColor: "#0286FF",
              borderRadius: 9999,
            }}
          />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View
            key={item.id}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                marginTop: 40,
                marginBottom: 40,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 30,
                  fontWeight: "bold",
                  marginHorizontal: 40,
                  textAlign: "center",
                }}
              >
                {item.title}
              </Text>
            </View>
            <Image
              source={{ uri: item.image }}
              style={{ width: "100%", height: 200 }}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: 16,
                fontFamily: "JakartaSemiBold",
                textAlign: "center",
                color: "#858585",
                marginHorizontal: 40,
                marginTop: 12,
              }}
            >
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      <Button
        onPress={() =>
          isLastSlide
            ? router.replace("/(auth)/verify-email")
            : swiperRef.current?.scrollBy(1)
        }
        style={{ width: "90%", marginTop: 40, marginBottom: 20 }}
        mode="outlined"
      >
        <Text>{isLastSlide ? "Get Started" : "Next"}</Text>
      </Button>
    </SafeAreaView>
  );
}
