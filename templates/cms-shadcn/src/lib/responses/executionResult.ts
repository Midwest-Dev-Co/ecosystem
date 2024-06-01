export default function executionResult<Payload>(
    payload: Payload,
    success: boolean
) {
    return {
        payload,
        success,
    };
}
