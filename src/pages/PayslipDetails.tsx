import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { payslips } from "../utils/mockData";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import { Capacitor } from "@capacitor/core";
import styled from "styled-components";

const DetailsContainer = styled.div`
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${Capacitor.isNativePlatform() ? "20px" : "20px auto"};
  ${Capacitor.isNativePlatform()
    ? ""
    : "position: absolute; top: 50%; transform: translateY(-50%);"}
`;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
  background-color: #f0f0f0;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 16px;
  text-align: center;
`;

const Paragraph = styled.p`
  font-size: 16px;
  margin: 8px 0;
  text-align: center;
`;

const Button = styled.button`
  margin-top: 16px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;
const PayslipDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const payslip = payslips.find((p) => p.id === id);
  const [filePath, setFilePath] = useState("");

  if (!payslip) {
    return <p>Payslip not found</p>;
  }

  const handleWebDownload = async () => {
    const response = await fetch(payslip.file);
    const blob = await response.blob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = payslip.file;
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleDownload = async () => {
    const fileUri = Capacitor.convertFileSrc(payslip.file);
    const response = await fetch(fileUri);
    const blob = await response.blob();
    const reader = new FileReader();

    reader.onload = async () => {
      const base64Data = reader.result as string;
      let directory: Directory;
      let path: string;

      const platform = Capacitor.getPlatform();
      const isAndroid = platform === "android";
      directory = isAndroid ? Directory.ExternalStorage : Directory.Documents;
      path = `${isAndroid ? "Download" : "Documents"}/${payslip.file}`;

      try {
        // Write the file to the file system
        await Filesystem.writeFile({
          path,
          data: base64Data,
          directory,
        });

        console.log(`File written to ${path}`);
      } catch (error) {
        console.error(`Error writing file: ${error}`);
      }
    };

    fetch(payslip.file)
      .then((response) => response.blob())
      .then((blob) => {
        reader.readAsDataURL(blob);
      });
  };

  const handleDownloadClick = async () => {
    const platform = Capacitor.getPlatform();
    if (platform === "web") {
      handleWebDownload();
    } else {
      handleDownload();
    }
  };

  return (
    <PageContainer>
      <DetailsContainer>
        <Title>Payslip Details</Title>
        <Paragraph>ID: {payslip.id}</Paragraph>
        <Paragraph>
          Period: {payslip.fromDate} to {payslip.toDate}
        </Paragraph>
        <Button onClick={handleDownloadClick}>Download Payslip</Button>
      </DetailsContainer>
    </PageContainer>
  );
};

export default PayslipDetails;
