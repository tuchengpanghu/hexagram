import os

from flask import Flask, make_response, render_template

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
        "total_width": image_width + padding * 2,
        "padding": padding,
    }

@app.route("/<gram>")
def get_svg(gram):
    template_fields = {}
    template = "default.svg"

    if gram == "hexagram":
        template_fields = get_hexagram_template_fields()
        template = "hexagram.svg"

    t = render_template(template, **template_fields)

    response = make_response(t)
    response.headers["Content-Type"] = "image/svg+xml"
    return response

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port)
