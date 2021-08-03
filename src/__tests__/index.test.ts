import {createComponentsManager} from '../index';
import { sampleOutput, validInput } from "./testContants";

describe("Check if componentsManager returns an obnjets", () => {
    it("should return an objets", () => {
        const componentsManager = createComponentsManager();
        const algo = componentsManager.procces("END");
        expect(algo).toBe("END");
    });


    it("Sample impout should return the sample output", () => {
        const componentsManager = createComponentsManager();
        const algo = componentsManager.procces(validInput.join("\n"));
        expect(algo).toBe(sampleOutput);
    });


});