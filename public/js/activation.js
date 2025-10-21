const allInputs = document.querySelectorAll(".opt-input");

allInputs.forEach((ele, ind) => {
    ele.addEventListener("input", e => {
        const value = e.target.value;
        //if input
        if (value && ind < allInputs.length - 1) {
            allInputs[ind + 1].focus();
        }
        //if delete
        if (!value && ind > 0) {
            allInputs[ind - 1].focus();
        }
    });
});

const sendOpt = async opt => {
    try {
        const result = await fetch("/api/users/activation", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                opt: opt,
            }),
        });
        const parsedR = await result.json();
        if (!result.ok) {
            Swal.fire({
                title: "invalid code",
                text: parsedR.message,
                icon: "error",
            });
            throw new Error("can't send opt to server");
        }

        Swal.fire({
            title: "activation successfully",
            text: "now you can log in",
            icon: "success",
        }).then(result => {
            if (result.isConfirmed) {
                window.location.href = "/login";
            }
        });
    } catch (e) {
        console.log(e);
    }
};

document.querySelector(".verify-btn").addEventListener("click", () => {
    let optCode = "";
    let optStatus = true;

    const optCodeType = /^[0-9]$/;

    allInputs.forEach(el => {
        if (el.value === "" || !optCodeType.test(el.value)) {
            optStatus = false;
            return;
        }
        optCode += el.value;
    });

    if (!optStatus || optCode.length !== 6) {
        Swal.fire({
            title: "invalid code",
            text: "please add a valid OPT",
            icon: "error",
        });
        return;
    }
    sendOpt(optCode);
});
