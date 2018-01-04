import { Injectable } from "@angular/core";
import { CustomActions } from "~/store/customActions";
import { GeneralConst } from "~/actions/general/general.const";
import { contriesWithCodes } from "~/shared/static-data/countryWithCodes";

@Injectable()
export class GeneralActions {
  constructor() {
    //
  }

  public setCountriesWithCodes(): CustomActions {
    return {
      type: GeneralConst.SET_COUNTRIES_WITH_CODES,
      payload: contriesWithCodes
    }
  }
}
