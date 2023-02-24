import * as WoT from "wot-typescript-definitions";

export class WotDevice {
    public thing: WoT.ExposedThing;
    public deviceWoT: typeof WoT;
    public td: WoT.ExposedThingInit;

    private thingModel: WoT.ExposedThingInit = {
        "@context": ["https://www.w3.org/2019/wot/td/v1", { "@language": "en" }],
        "@type": "",
        id: "new:thing",
        title: "omnia_thing",
        description: "",
        securityDefinitions: {
            "": {
                scheme: "nosec",
            },
        },
        security: "",
        properties: {
            myProperty: {
                title: "A short title for User Interfaces",
                description: "A longer string for humans to read and understand",
                unit: "",
                type: "string",
            },
        },
    };

    private myProperty: WoT.InteractionInput;

    constructor(deviceWoT: typeof WoT, tdDirectory?: string) {
        this.deviceWoT = deviceWoT;
    }

    public async startDevice() {
        const exposedThing = await this.deviceWoT.produce(this.thingModel);
        console.log(`Produced Thing: ${this.thingModel.title}`);

        this.thing = exposedThing;
        this.td = exposedThing.getThingDescription();
        this.initializeProperties();

        await this.thing.expose();
        console.log(`Exposed Thing: ${this.thingModel.title}`);
    }

    private initializeProperties() {
        this.myProperty = "Hello world";
        this.thing.setPropertyReadHandler("myProperty", this.myPropertyReadHandler);
        this.thing.setPropertyWriteHandler("myProperty", this.myPropertyWriteHandler);
    }

    private async myPropertyReadHandler(options?: WoT.InteractionOptions) {
        console.log("Reading property");
        return this.myProperty;
    }

    private async myPropertyWriteHandler(inputData: WoT.InteractionOutput, options?: WoT.InteractionOptions) {
        console.log("Writing property");
        this.myProperty = await inputData.value();
    }
}