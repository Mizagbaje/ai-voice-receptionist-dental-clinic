const input = $input.first().json || {};
const body = input.body || input;
const msg = body.message || {};
const call = (msg.toolCallList && msg.toolCallList[0]) || (msg.toolCalls && msg.toolCalls[0]) || {};
const fn = call.function || {};
let args = fn.arguments !== undefined ? fn.arguments : (call.arguments || {});
if (typeof args === 'string') {
  try { args = JSON.parse(args); } catch (e) { args = {}; }
}
if (!args || typeof args !== 'object') { args = {}; }
return [{
  json: {
    toolCallId: call.id || 'test-call',
    patientName: args.patient_name || body.patient_name || 'Unknown patient',
    phone: args.phone || body.phone || '',
    dateTime: args.date_time || body.date_time || '',
    reason: args.reason || body.reason || 'General appointment'
  }
}];
