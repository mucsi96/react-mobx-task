import * as validationHelper from "./validationHelper"
import * as Transformation from "../models/Transformation"
// @ponicode
describe("validationHelper.transfrormationsToMap", () => {
    test("0", () => {
        let inst: any = new Transformation.Transformation("4.0.0-beta1\t", "1.0.0")
        let param1: any = [inst]
        let callFunction: any = () => {
            validationHelper.transfrormationsToMap(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let inst: any = new Transformation.Transformation("v1.2.4", "^5.0.0")
        let param1: any = [inst]
        let callFunction: any = () => {
            validationHelper.transfrormationsToMap(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let inst: any = new Transformation.Transformation("v1.2.4", "4.0.0-beta1\t")
        let param1: any = [inst]
        let callFunction: any = () => {
            validationHelper.transfrormationsToMap(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let inst: any = new Transformation.Transformation("1.0.0", "v4.0.0-rc.4")
        let param1: any = [inst]
        let callFunction: any = () => {
            validationHelper.transfrormationsToMap(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let inst: any = new Transformation.Transformation("4.0.0-beta1\t", "v1.2.4")
        let inst2: any = new Transformation.Transformation("^5.0.0", "v4.0.0-rc.4")
        let param1: any = [inst, inst2]
        let callFunction: any = () => {
            validationHelper.transfrormationsToMap(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            validationHelper.transfrormationsToMap([])
        }
    
        expect(callFunction).not.toThrow()
    })
})
