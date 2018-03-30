
class Simulation {
    constructor() {
    }
    RegisterOnReady() {
        $($.proxy(this.onReady, this))
    }
    onReady() {
        console.log("Simulation.onReady")
        $("#Reset").on('click', () => {
            $(this).trigger('reset')
        })
        $("#Start").on('click', () => {
            if (!this.isRunning) {
                this.changeRunning("Arr&ecirc;ter", true)
                $(this).trigger('start')
            } else {
                this.changeRunning("D&eacute;marrer", false)
                $(this).trigger('stop')
            }
        })
        $("input:radio[name='size']").on('change', () => {
            $(this).trigger('reset')
        })
        $("#MoveForward").on('click', () => {
            for (let i = 0; i < $("#NbSteps").val(); i++) {
                $(this).trigger('move')
            }
        })
    }
    changeRunning(text, isRunning) {
        $("#Start").html(text)
        $("#Start").data('isRunning', isRunning)
    }
    get Size() {
        return parseInt($("input:radio[name='size']:checked").val())
    }
    get Interval() {
        return $("#Interval").val()
    }

    get isRunning() {
        return $("#Start").data('isRunning')
    }
}
