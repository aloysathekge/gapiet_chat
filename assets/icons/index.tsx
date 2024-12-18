import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Home from "./Home";
import { SvgProps } from "react-native-svg";
import { theme } from "@/constants/theme";
import { ArrowLeft } from "./ArrowLeft";
import Mail from "./Mail";
import Lock from "./Lock";
import User from "./User";

const icons = {
  home: Home,
  arrowLeft: ArrowLeft,
  mail: Mail,
  lock: Lock,
  user: User,
};
export default function Icon({
  name,
  ...props
}: { name: keyof typeof icons; size?: number } & SvgProps) {
  const IconComponent = icons[name];
  return (
    <IconComponent
      height={props.size || 24}
      width={props.size || 24}
      strokeWidth={props.strokeWidth || 1.9}
      color={theme.colors.textLight}
      {...props}
    />
  );
}

const styles = StyleSheet.create({});