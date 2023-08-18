document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectButton');
    const colorSelect = document.getElementById('colorSelect');
    const changeColorButton = document.getElementById('changeColorButton');

    let echoButtonDevice;
    const serviceUuid = 'your_echo_button_service_uuid';
    const characteristicUuid = 'your_characteristic_uuid';

    async function connectToButton() {
        try {
            echoButtonDevice = await navigator.bluetooth.requestDevice({
                filters: [{ services: [serviceUuid] }]
            });

            await echoButtonDevice.gatt.connect();

            // Enable color change button
            changeColorButton.disabled = false;
        } catch (error) {
            console.error('Error connecting to Echo Button:', error);
        }
    }

    async function changeButtonColor() {
        if (!echoButtonDevice) {
            console.error('No connected Echo Button');
            return;
        }

        const color = colorSelect.value;

        const service = await echoButtonDevice.gatt.getPrimaryService(serviceUuid);
        const characteristic = await service.getCharacteristic(characteristicUuid);

        // Send color change command to the button
        // Modify this part according to your Echo Button's Bluetooth protocol

        console.log(`Button color changed to ${color}`);
    }

    connectButton.addEventListener('click', connectToButton);
    changeColorButton.addEventListener('click', changeButtonColor);
});
