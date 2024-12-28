import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { theme } from "@/constants/theme";

type RichTextEditorProps = {
  editorRef: any;
  onChange: (content: string) => void;
  onInit?: () => void;
};

export default function RichTextEditor({
  editorRef,
  onChange,
  onInit,
}: RichTextEditorProps) {
  return (
    <View style={{ minHeight: 250 }}>
      <RichToolbar
        getEditor={() => editorRef.current}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.removeFormat,
          actions.alignRight,
          actions.alignLeft,
          actions.code,
          actions.line,
          actions.heading1,
          actions.heading4,
        ]}
        iconMap={{
          [actions.heading1]: ({ tintColor }: { tintColor: string }) => (
            <Text style={styles.tintColor}>H1</Text>
          ),
          [actions.heading4]: ({ tintColor }: { tintColor: string }) => (
            <Text style={styles.tintColor}>H4</Text>
          ),
        }}
        style={styles.richBar}
        flatContainerStyle={styles.listStyle}
        disabled={false}
        selectedIconTint={theme.colors.primaryDark}
      />
      <RichEditor
        ref={editorRef}
        containerStyle={styles.richEditor}
        editorStyle={styles.contentStyle}
        onChange={onChange}
        placeholder="Write out your mind"
        onLoadEnd={onInit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  richBar: {
    borderTopRightRadius: theme.radius.xl,
    borderTopLeftRadius: theme.radius.xl,
    backgroundColor: theme.colors.gray,
  },
  listStyle: {
    paddingHorizontal: 8,
    gap: 3,
  },
  richEditor: {
    flex: 1,
    minHeight: 200,
    borderWidth: 1.5,
    borderTopWidth: 0,
    borderBottomLeftRadius: theme.radius.xl,
    borderBottomRightRadius: theme.radius.xl,
    borderColor: theme.colors.gray,
    padding: 5,
  },
  contentStyle: {
    color: theme.colors.dark,
  },
  tintColor: {
    color: theme.colors.text,
  },
});
