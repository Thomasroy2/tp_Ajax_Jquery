
class Pattern {
    constructor() {
    }
    RegisterOnReady() {
        $($.proxy(this.onReady, this))
    }
    onReady() {
        console.log("Pattern.onReady")
        $("#Pattern").on('change', () => {
            Pattern.createRow($("#"+$("#Pattern").val()).data('steps'))
            $(this).trigger('reset')
            // Pattern.setOnChange()
        })
    }
    static setOnChange() {
        $("#CurrentPattern > tbody > tr").each((i, tr) => {
            $(tr).children('td.then-color').on('change', Pattern.onColorChange)
        })
    }
    static onColorChange(e){
        let currentRow = $(e.currentTarget).parent('tr') 
        currentRow.nextAll().remove()
        if ($("td.if-color[value='"+ currentRow.children('td.then-color').children('select').val() +"']").length >= 1) {
            let y = document.createElement('span')
            y.innerHTML = '&#9760; La couleur existe d&eacute;j&agrave; &#9760;'
            alert(y.innerHTML)
        } else {
            let step = {
                if: currentRow.children('.then-color').children('select').val()
            }
            currentRow.parent('tbody').append(Pattern.GetHtmlRow(step))
            currentRow.next().children('td.then-color').on('change', Pattern.onColorChange)
        }
    }
    static GetSelect(json, selected) {
        let html = '<select>'
        for (var property in json) {
            html += '<option value="' + property + '"'
            if (selected === property) {
                html += ' selected="selected"'
            }

            html += '>' + json[property] + '</option>'
        }

        html += '</select>'
        return html
    }
    static createSelect(patterns) {
        patterns.forEach(pattern => {
            $("#Pattern").append("<option data-steps=" + JSON.stringify(pattern.steps) + " value=" + pattern.name + " id=" + pattern.name + ">" + pattern.name + "</option>")
        })
        Pattern.createRow($("#"+$("#Pattern").val()).data('steps'))
    }
    static GetHtmlRow(step) {
        let settings = $.extend({
            if: "#FFFFFF",
            then: {
                color: "#FFFFFF",
                direction: "left"
            }
        }, step)

        let html = '<tr data-if-color="' + settings.if + '">'
        html += '<td class="if-color" value=' + settings.if + '>' + PatternColor[settings.if] + '</td>'
        html += '<td class="then-color" value=' + settings.then.color + '>' + Pattern.GetSelect(PatternColor, settings.then.color) + '</td>'
        html += '<td class="then-direction">' + Pattern.GetSelect(PatternDirection, settings.then.direction) + '</td>'
        html += '</tr>'
        return html
    }
    static createRow(steps) {
        $("#CurrentPattern > tbody").html('')
        steps.forEach((step) => {
            let html = Pattern.GetHtmlRow(step)
            $("#CurrentPattern > tbody").append(html)
        })
        Pattern.setOnChange()
    }
}


const PatternColor = Object.freeze({
    "#FFFFFF": "Blanc",
    "#6D9ECE": "Bleu Clair",
    "#1F5FA0": "Bleu Fonc&eacute;",
    "#6D071A": "Bordeaux",
    "#606060": "Gris",
    "#F0C300": "Jaune",
    "#000000": "Noir",
    "#FF7F00": "Orange",
    "#E0115F": "Rose",
    "#DB1702": "Rouge",
    "#008020": "Vert",
    "#7F00FF": "Violet"
})

const PatternDirection = Object.freeze({
    "left": "Gauche",
    "right": "Droite"
})
