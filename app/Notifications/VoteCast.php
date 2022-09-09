<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\HtmlString;

class VoteCast extends Notification implements ShouldQueue
{
    use Queueable;
    private $mailData;

    public $tries = 5;

    public function retryUntil()
    {
        return now()->addMinutes(10);
    }
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($mailData)
    {
        $this->mailData = $mailData;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $portfolioName = strtoupper($this->mailData->electionPortfolio->portfolio->name);
        if ($this->mailData->skipped == 1){
            $string =  " skipped the ".$portfolioName. ' portfolio';
        }else{
            $string = ' voted for ' . strtoupper($this->mailData->candidate->name) . ' as '.$portfolioName;
        }
        return (new MailMessage)
            ->line('You\'ve successfully '. $string
                . ' in the '. $this->mailData->election->name . ' election.')
            ->line('Date & Time: '. $this->mailData->created_at)
            ->line('Thank you.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
