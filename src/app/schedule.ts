export class Schedule {
    constructor(public days : Array<DaySchedule>) {

    }
}

export class DaySchedule {
    
    constructor(public day : Date, public blocks : Array<Block>) {
        
    }
}

export class Block {
    constructor(public start: Date, public end: Date, public name: String, public items: Array<BlockItem>) {
        
    }
}

export class BlockItem {
    constructor(public location: Location, public name: String, public description: String, public host?: Host, public image?: URL) {
        
    }
}

export class Location {
    constructor(public name: String, lat: number, long: number) {

    }
}

export class Host {
    constructor(public image: URL, public name: String, public description: String) {

    }
}

export const SCHEDULE = new Schedule([
    new DaySchedule(
        new Date("2018-05-03"),
        [
            new Block(
                new Date("2018-05-03,09:30"),
                new Date("2018-05-03,11:15"),
                "example Block 1",
                [
                    new BlockItem(
                        new Location("Hörsaal 1", -1, -1),
                        "1 nicer workshop von den boys von Hack & Söhne",
                        "H&S Workshop",
                        new Host(
                            new URL("https://hackundsoehne.de/img/logo_red.png)"),
                            "Hack & Söhne",
                            "HSG am KIT, Teil von talKIT"
                        )
                    )
                ]
            ),
            new Block(
                new Date("2018-05-03,11:30"),
                new Date("2018-05-03,13:00"),
                "example Block 2",
                [
                    new BlockItem(
                        new Location("Hörsaal 1", -1, -1),
                        "1 nicer workshop von den boys von Hack & Söhne",
                        "H&S Workshop",
                        new Host(
                            new URL("https://hackundsoehne.de/img/logo_red.png)"),
                            "Hack & Söhne",
                            "HSG am KIT, Teil von talKIT"
                        )
                    ),
                    new BlockItem(
                        new Location("Hörsaal 2", -1, -1),
                        "1 nicer workshop von den boys von Hack & Söhne",
                        "Nr 2",
                        new Host(
                            new URL("https://hackundsoehne.de/img/logo_red.png)"),
                            "Hack & Söhne",
                            "HSG am KIT, Teil von talKIT"
                        )
                    )
                ]
            )
        ]
    ),
    new DaySchedule(
        new Date("2018-05-04"),
        [
            new Block(
                new Date("2018-05-04,09:30"),
                new Date("2018-05-04,11:15"),
                "example Block 3",
                [
                    new BlockItem(
                        new Location("Hörsaal 1", -1, -1),
                        "1 nicer workshop von den boys von Hack & Söhne",
                        "H&S Workshop",
                        new Host(
                            new URL("https://hackundsoehne.de/img/logo_red.png)"),
                            "Hack & Söhne",
                            "HSG am KIT, Teil von talKIT"
                        )
                    )
                ]
            ),
            new Block(
                new Date("2018-05-04,11:30"),
                new Date("2018-05-04,13:00"),
                "example Block 4",
                [
                    new BlockItem(
                        new Location("Aurum", -1, -1),
                        "get piss drunk on a rooftop",
                        "Nr 2",
                        undefined,
                        new URL("http://talkit.eu/img/2017/Resize/talKIT%202017%20Event%201800x1200%20(30).jpg")
                    )
                ]
            )
        ]
    )
])