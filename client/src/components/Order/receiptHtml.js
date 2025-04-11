// receiptTemplate.js
export const generateReceiptHTML = (order, formatDate, formatCurrency) => {
    const receiptDate = formatDate(order.createdAt);
    const orderNumber = `#${order._id.slice(-8).toUpperCase()}`;
    
    return `
      <html>
        <head>
          <title>Receipt ${orderNumber}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
          <style>
            @media print {
              @page {
                size: A4;
                margin: 0;
              }
              body {
                padding: 0 !important;
                margin: 0 !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              .no-print {
                display: none !important;
              }
              .receipt-container {
                box-shadow: none !important;
                border-radius: 0 !important;
              }
            }
            body {
              font-family: 'Inter', sans-serif;
            }
            .watermark {
              position: absolute;
              opacity: 0.05;
              font-size: 72px;
              transform: rotate(-30deg);
              z-index: 0;
            }
          </style>
        </head>
        <body class="bg-gray-50 p-6 md:p-10">
          <div class="receipt-container max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden relative">
            <!-- Watermark -->
            <div class="watermark text-gray-400 font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              IMS
            </div>
            
            <!-- Enhanced Header -->
            <div class="bg-gradient-to-r from-indigo-600 to-indigo-800 px-8 py-6 text-white">
              <div class="flex justify-between items-start">
                <div>
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div>
                      <h1 class="text-3xl font-bold tracking-tight">IMS STORE</h1>
                      <p class="text-indigo-200">Official Order Receipt</p>
                    </div>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-indigo-200 text-sm">Receipt</p>
                  <p class="font-mono font-bold text-lg">${orderNumber}</p>
                </div>
              </div>
            </div>
  
            <!-- Receipt Meta -->
            <div class="px-8 py-6 border-b border-gray-200">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-500 mb-1">Issued On</p>
                  <p class="font-medium">${receiptDate}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 mb-1">Status</p>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ${order.status || 'Completed'}
                  </span>
                </div>
              </div>
            </div>
  
            <!-- Customer Info -->
            <div class="px-8 py-6 border-b border-gray-200 bg-gray-50">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Customer Details</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-500 mb-1">Name</p>
                  <p class="font-medium">${order.customerName || 'Not specified'}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 mb-1">Email</p>
                  <p class="font-medium">${order.customerEmail || 'Not specified'}</p>
                </div>
              </div>
            </div>
  
            <!-- Order Items -->
            <div class="px-8 py-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                      <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                      <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                      <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    ${(order.products || []).map((item, index) => `
                      <tr key="${index}" class="${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}">
                        <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${item.product?.name || item.name}
                        </td>
                        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                          ${item.quantity}
                        </td>
                        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                          ${formatCurrency(item.product?.price || item.price || 0)}
                        </td>
                        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium text-right">
                          ${formatCurrency((item.product?.price || item.price || 0) * item.quantity)}
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
  
              <!-- Order Summary -->
              <div class="mt-8 border-t border-gray-200 pt-6">
                <div class="space-y-3">
                  <div class="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${formatCurrency(order.subtotal || order.totalAmount || 0)}</p>
                  </div>
                  ${order.discount ? `
                    <div class="flex justify-between text-sm text-gray-500">
                      <p>Discount</p>
                      <p>-${formatCurrency(order.discount)}</p>
                    </div>
                  ` : ''}
                  ${order.tax ? `
                    <div class="flex justify-between text-sm text-gray-500">
                      <p>Tax</p>
                      <p>${formatCurrency(order.tax)}</p>
                    </div>
                  ` : ''}
                  ${order.shippingCost ? `
                    <div class="flex justify-between text-sm text-gray-500">
                      <p>Shipping</p>
                      <p>${formatCurrency(order.shippingCost)}</p>
                    </div>
                  ` : ''}
                  <div class="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                    <p>Total</p>
                    <p>${formatCurrency(order.totalAmount || 0)}</p>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Footer -->
            <div class="px-8 py-6 bg-gray-50 border-t border-gray-200 text-center">
              <div class="flex justify-center space-x-6 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p class="text-sm text-gray-500 mb-2">Thank you for shopping with us!</p>
              <p class="text-xs text-gray-400">This is an official receipt from IMS Store. Please retain for your records.</p>
              <div class="mt-4 no-print">
                <button onclick="window.print()" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Print Receipt
                  <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 -mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
  };


//   For shipping address location if we have
//   ${order.shippingAddress ? `
//     <div class="md:col-span-2">
//       <p class="text-sm text-gray-500 mb-1">Shipping Address</p>
//       <p class="font-medium">${order.shippingAddress}</p>
//     </div>
//   ` : ''}