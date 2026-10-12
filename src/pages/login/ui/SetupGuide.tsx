const steps = [
  {
    title: 'Откройте консоль GREEN-API',
    text: 'Перейдите на console.green-api.com, войдите и откройте раздел «Инстансы», затем нужный инстанс.',
  },
  {
    title: 'Привяжите WhatsApp',
    text: 'Статус должен быть «Авторизован». Если нет — нажмите «Связать по QR-коду» и отсканируйте код: WhatsApp → Настройки → Связанные устройства → Привязать устройство.',
  },
  {
    title: 'Включите приём сообщений',
    text: 'В настройках инстанса включите «Получать уведомления о входящих сообщениях» и оставьте поле с адресом уведомлений (URL) пустым.',
  },
  {
    title: 'Скопируйте данные',
    text: 'На странице инстанса возьмите idInstance и apiTokenInstance и вставьте их в форму.',
  },
]

export function SetupGuide() {
  return (
    <section className="w-full max-w-sm space-y-4 rounded-2xl border bg-card/70 p-6 shadow-none">
      <h2 className="text-lg font-semibold">Где взять данные для входа</h2>
      <ol className="space-y-3">
        {steps.map((s, i) => (
          <li key={s.title} className="flex gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {i + 1}
            </span>
            <div className="text-sm">
              <p className="font-medium">{s.title}</p>
              <p className="text-muted-foreground">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
