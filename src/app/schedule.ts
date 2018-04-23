export class Schedule {
    constructor(public days : Array<DaySchedule>) {

    }

    static fromJSON(json: any) : Schedule {
        return new Schedule(json.days.map(x => DaySchedule.fromJSON(x)))
    }
}

export class DaySchedule {
    
    constructor(public day : Date, public blocks : Array<Block>) {
        
    }

    static fromJSON(json: any) : DaySchedule {
        return new DaySchedule(new Date(json.day), json.blocks.map(x => Block.fromJSON(x)))
    }
}

export class Block {
    constructor(public start: Date, public end: Date, public name: String, public items: Array<BlockItem>) {
        
    }

    static fromJSON(json: any) : Block {
        return new Block(
            new Date(json.start), 
            new Date(json.end), 
            json.name, 
            json.items.map(x => BlockItem.fromJSON(x))
        )
    }

    public getTime() : String {
        let start = `${this.start.getHours()}:${this.start.getMinutes()}`
        let end = `${this.end.getHours()}:${this.end.getMinutes()}`
        return start + ' - ' + end
    }

    public getDateTime() : String {
        var options = { weekday: 'long'};
        let day = this.start.toLocaleDateString('de-DE', options)
        return day + ', ' + this.getTime()
    }
}

export class BlockItem {
    constructor(public location: Location, public name: String, public description: String, public host?: Host, public image?: string) {
        
    }

    static fromJSON(json: any) : BlockItem {
        var host = undefined
        if (json.host) {
            host = Host.fromJSON(json.host)
        }
        var string = undefined
        if (json.string) {
            string = string
        }
        return new BlockItem(
            Location.fromJSON(json.location), 
            json.name, 
            json.description,
            host,
            string
        )
    }
}

export class Location {
    constructor(public name: String, public lat: number, public long: number) {

    }

    static fromJSON(json: any) : Location {
        return new Location(json.name, json.lat, json.long)
    }
}

export class Host {
    constructor(public image: string, public name: String, public title : String, public description: String, public link? : string) {

    }

    static fromJSON(json: any) : Host {
        var link = undefined
        if (json.link) {
            link = link
        }
        return new Host(
            json.image,
            json.name,
            json.title,
            json.description,
            link
        )
    }
}