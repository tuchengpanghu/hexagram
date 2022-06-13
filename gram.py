import os

from flask import Flask, make_response, render_template, send_from_directory

app = Flask(__name__)

def get_hexagram_template_fields():
    base_height = 50
    base_width = 22
    padding = base_width
    image_width = base_width * 64

    return {
        "base_height": base_height,
        "base_width": base_width,
        "image_width": image_width,
        "total_width": image_width + padding * 3,
        "padding": padding,
    }

def get_trigram_template_fields():
    font_size = 25
    start_x = 640 - font_size/2
    start_y = 300

    return {
        "font_size": font_size,
        "start_x": start_x,
        "start_y": start_y
    }

@app.route("/<gram>")
def get_svg(gram):
    template_fields = {}
    template = "default.svg"

    if gram == "hexagram":
        template_fields = get_hexagram_template_fields()
        template = "hexagram.svg"

    if gram == "trigram":
        template_fields = get_trigram_template_fields()
        template = "trigram.svg"

    t = render_template(template, **template_fields)

    response = make_response(t)
    response.headers["Content-Type"] = "image/svg+xml"
    return response

@app.route("/local/<filename>")
def download(filename):
    return send_from_directory(directory="", filename=filename, mimetype="image/svg+xml")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port)
