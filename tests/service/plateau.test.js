const PlateauService = require("../../src/service/plateau");

describe('plateau-service:create/isValidPosition', () => {
    test('should create a new plateau and validate position', () => {
        const plateau = new PlateauService();
        plateau.create(["2", "2"]);

        const result = plateau.isInvalidPosition({ x: "1", y: "2", facing: "N" });
        expect(result).toBeFalsy();
    });

    test('should create a new plateau and not validate landing position outside plateau', () => {
        const plateau = new PlateauService();
        plateau.create(["2", "2"]);

        const result = plateau.isInvalidPosition({ x: "1", y: "3", facing: "N" });
        expect(result).toBeTruthy();
    });

    test('should create a new plateau and not validate landing position with an already rover parked in', () => {
        const plateau = new PlateauService();
        plateau.create(["4", "4"]);
        plateau.park({ x: "1", y: "2", facing: "N" });
        plateau.park({ x: "3", y: "4", facing: "N" });

        const result = plateau.isInvalidPosition({ x: "3", y: "4", facing: "N" });
        expect(result).toBeTruthy();
    });
    
});
