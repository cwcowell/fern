// This file was auto-generated by Fern from our API Definition.

package client

import (
	authclient "github.com/oauth-client-credentials-nested-root/fern/auth/client"
	core "github.com/oauth-client-credentials-nested-root/fern/core"
	option "github.com/oauth-client-credentials-nested-root/fern/option"
	http "net/http"
)

type Client struct {
	baseURL string
	caller  *core.Caller
	header  http.Header

	Auth *authclient.Client
}

func NewClient(opts ...option.RequestOption) *Client {
	options := core.NewRequestOptions(opts...)
	return &Client{
		baseURL: options.BaseURL,
		caller: core.NewCaller(
			&core.CallerParams{
				Client:      options.HTTPClient,
				MaxAttempts: options.MaxAttempts,
			},
		),
		header: options.ToHeader(),
		Auth:   authclient.NewClient(opts...),
	}
}
