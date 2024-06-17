import path from "path";
import ReusableFunctions from "../../src/ReusableFunctions/ReusableFunctions";
import { test } from "@playwright/test";




test("Upload baseline image", async () => {
    const blobName = "CatImage2";
    const Reusable = new ReusableFunctions();

    await Reusable.UploadFileToAzureBlobStorage("../../TestImages/CatTestImage.jpg", "Persona/Baseline", blobName);
})

test("Delete baseline image", async () => {
    const blobName = "CatImage2";
    const Reusable = new ReusableFunctions();

    await Reusable.DeleteImageBlob(blobName, "Persona/Baseline");
})