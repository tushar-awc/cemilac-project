package com.iso.util;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.regex.Pattern;

public class Utility {

    public static boolean fileExists(String fileName) {

        try {
            Path filePath = Paths.get(fileName);
            return Files.exists(filePath);
        } catch (Exception e) {
            System.out.println("Exception in finding File Presence: " + e.getMessage());
            e.printStackTrace();
            return false;
        }

    }

    public static void deleteFile(String fileName) {
        if (fileExists(fileName)) {
            try {
                Files.delete(Paths.get(fileName));

            } catch (IOException e) {
                System.out.println("Delete of File: " + fileName + "failed");
                e.printStackTrace();
            }
        }
    }

    public static String getDAID(String folderNameContains, File[] fileList) {
        String substring = "";

        for (File file : fileList) {
            if (file.isDirectory() && file.getName().contains(folderNameContains)) {
                String filename = file.getName();

                substring = filename.substring(0, filename.indexOf("_"));

                break;

            }
        }

        return substring;
    }

    // ***************password Hash****************************
    public static String computeSHA256Hash(String input) throws Exception {
        try {
            // Create a SHA-256 message digest
            MessageDigest digest = MessageDigest.getInstance("SHA-256");

            // Compute the hash value of the input
            byte[] hashBytes = digest.digest(input.getBytes(StandardCharsets.UTF_8));

            // Convert the byte array to a hexadecimal string representation
            StringBuilder hexString = new StringBuilder();
            for (byte hashByte : hashBytes) {
                String hex = Integer.toHexString(0xff & hashByte);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new Exception("Algorithm Exception while Hashing Password");
        } catch (Exception e) {
            throw new Exception("Exception while Hashing Password");
        }
    }
    // ********************************************************

    public static boolean isValid(String input) {

        if (input == null || input == "" || input == " ") {
            return true;
        }
        String regex = "^[A-Za-z0-9 '.,_:;/\\- \\r\\n]+$";

        Pattern pattern = Pattern.compile(regex);

        // Check if the input matches the pattern
        return pattern.matcher(input).matches();
    }

}
