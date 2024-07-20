import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.app",
  appName: "payslip-manager",
  webDir: "build",
  plugins: {
    Filesystem: {
      directory: "data",
    },
    FileOpener: {
      contentType: "image/png",
    },
  },
};

export default config;
