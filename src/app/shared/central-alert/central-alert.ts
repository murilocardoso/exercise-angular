export class CentralAlert {
  constructor(public readonly centralAlertType: CentraAlertType,
              public readonly message: string){}
}

export enum CentraAlertType {
  SUCCESS,
  WARNING,
  ERROR,
  INFO
}
