/// <reference path="ant.js" />
/// <reference path="grid.js" />
/// <reference path="pattern.js" />
/// <reference path="simulation.js" />

class Langton {
    constructor() {
        this.Pattern = new Pattern()
        this.Simulation = new Simulation()
    }
    RegisterOnReady() {
        this.Pattern.RegisterOnReady()
        this.Simulation.RegisterOnReady()

        this.setPattern()
        $($.proxy(this.onReady, this))
    }
    setPattern() {
        $.getJSON('https://api.myjson.com/bins/crrrn', (data) => {
            Pattern.createSelect(data.patterns)
            $(".condition").show()
        })
    }
    onReady() {
        this.Grid = new Grid("Grid", this.Simulation.Size)
        this.Ant = new Ant(this.Grid.MiddleX, this.Grid.MiddleY)
        this.displayAntInfo()

        $(this.Ant).on("move", $.proxy(this.displayAntInfo, this))
        $(this.Simulation).on("start", $.proxy(this.onStart, this))
        $(this.Simulation).on("stop", $.proxy(this.onStop, this))
        $(this.Simulation).on("move", $.proxy(this.onMove, this))
        $(this.Simulation).on("reset", $.proxy(this.onReset, this))
        $(this.Pattern).on("reset", $.proxy(this.onReset, this))

        console.log("Langton.onReady")
    }
    onStart() {
        this.Interval = setInterval($.proxy(this.onMove, this), this.Simulation.Interval)
    }
    onStop() {
        clearInterval(this.Interval)
    }
    onMove() {
        if (this.Grid.GetColor(this.Ant.X, this.Ant.Y) != null){
            let toDo = $("td.if-color[value='"+ this.Grid.GetColor(this.Ant.X, this.Ant.Y) +"']").parent('tr')
            this.Grid.SetColor(this.Ant.X, this.Ant.Y, toDo.children('td.then-color').children('select').val())
            this.Ant.Turn(toDo.children('td.then-direction').children('select').val())
        } else {
            if (this.Simulation.isRunning) {
                clearInterval(this.Interval)
            }
        }
    }
    onReset() {
        this.onStop()
        this.Simulation.changeRunning("D&eacute;marrer", false)
        this.Grid.Size = this.Simulation.Size
        this.Ant.Reset(this.Grid.MiddleX, this.Grid.MiddleY)
    }
    displayAntInfo() {
        this.Grid.SetColor(this.Ant.X, this.Ant.Y, Ant.Color)
        $(".ant .ant-x").text(this.Ant.X)
        $(".ant .ant-y").text(this.Ant.Y)
        $(".ant .ant-direction").text(this.Ant.Direction)
        $(".ant .ant-nb-steps").text(this.Ant.NbSteps)
    }
}

let langton = new Langton()
langton.RegisterOnReady()
